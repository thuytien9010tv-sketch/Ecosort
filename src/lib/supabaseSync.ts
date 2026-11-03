import { getSupabaseClient } from './supabase';
import { UserProfile, ClassificationRecord, BinColor, WasteCategory } from '../types';

/**
 * Tải thông tin hồ sơ và điểm số từ Supabase Database
 */
export async function fetchCloudProfile(userId: string): Promise<Partial<UserProfile> | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      // Bảng chưa được tạo hoặc chưa có quyền
      console.warn('Supabase fetchCloudProfile warning:', error.message);
      return null;
    }

    if (!data) return null;

    return {
      name: data.name || undefined,
      avatar: data.avatar || undefined,
      points: typeof data.points === 'number' ? data.points : undefined,
      level: typeof data.level === 'number' ? data.level : undefined,
      dailyStreak: typeof data.daily_streak === 'number' ? data.daily_streak : undefined,
      lastActiveDate: data.last_active_date || undefined,
    };
  } catch (err) {
    console.warn('fetchCloudProfile exception:', err);
    return null;
  }
}

/**
 * Tải lịch sử phân loại rác từ Supabase Database
 */
export async function fetchCloudHistory(userId: string): Promise<ClassificationRecord[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('classification_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.warn('Supabase fetchCloudHistory warning:', error.message);
      return null;
    }

    if (!data) return null;

    return data.map((row: any) => ({
      id: row.id,
      itemId: row.item_id,
      itemName: row.item_name,
      category: row.category as WasteCategory,
      binColor: row.bin_color as BinColor,
      pointsEarned: row.points_earned || 5,
      timestamp: row.timestamp ? Number(row.timestamp) : new Date(row.created_at).getTime(),
      note: row.note || undefined,
    }));
  } catch (err) {
    console.warn('fetchCloudHistory exception:', err);
    return null;
  }
}

/**
 * Đồng bộ lưu hồ sơ lên Supabase Database
 */
export async function saveCloudProfile(userId: string, profile: Partial<UserProfile>): Promise<void> {
  const client = getSupabaseClient();
  if (!client) return;

  try {
    const payload: Record<string, any> = {
      id: userId,
      updated_at: new Date().toISOString(),
    };

    if (profile.name !== undefined) payload.name = profile.name;
    if (profile.avatar !== undefined) payload.avatar = profile.avatar;
    if (profile.points !== undefined) payload.points = profile.points;
    if (profile.level !== undefined) payload.level = profile.level;
    if (profile.dailyStreak !== undefined) payload.daily_streak = profile.dailyStreak;
    if (profile.lastActiveDate !== undefined) payload.last_active_date = profile.lastActiveDate;
    if (profile.email !== undefined) payload.email = profile.email;

    const { error } = await client.from('profiles').upsert(payload, { onConflict: 'id' });
    if (error) {
      console.warn('saveCloudProfile upsert warning:', error.message);
    }
  } catch (err) {
    console.warn('saveCloudProfile exception:', err);
  }
}

/**
 * Thêm bản ghi phân loại rác mới vào Supabase Database
 */
export async function insertCloudClassification(
  userId: string,
  record: ClassificationRecord
): Promise<void> {
  const client = getSupabaseClient();
  if (!client) return;

  try {
    const { error } = await client.from('classification_history').insert({
      id: record.id,
      user_id: userId,
      item_id: record.itemId,
      item_name: record.itemName,
      category: record.category,
      bin_color: record.binColor,
      points_earned: record.pointsEarned,
      timestamp: record.timestamp,
      note: record.note || null,
      created_at: new Date(record.timestamp || Date.now()).toISOString(),
    });

    if (error) {
      console.warn('insertCloudClassification error:', error.message);
    }
  } catch (err) {
    console.warn('insertCloudClassification exception:', err);
  }
}

/**
 * Xóa toàn bộ lịch sử của người dùng trên Cloud
 */
export async function clearCloudHistory(userId: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client) return;

  try {
    const { error } = await client
      .from('classification_history')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.warn('clearCloudHistory warning:', error.message);
    }
  } catch (err) {
    console.warn('clearCloudHistory exception:', err);
  }
}

