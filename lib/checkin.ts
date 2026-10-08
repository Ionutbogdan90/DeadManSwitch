import { supabase } from "./supabase";

export interface CheckIn {
  id: string;
  user_id: string;
  check_in_time: string;
  created_at: string;
  updated_at: string;
}

export async function createCheckIn(): Promise<CheckIn | null> {
  if (!supabase) {
    console.warn("Supabase not configured, using localStorage fallback");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("check_ins")
      .insert({
        check_in_time: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating check-in:", error);
    return null;
  }
}

export async function getLatestCheckIn(): Promise<CheckIn | null> {
  if (!supabase) {
    console.warn("Supabase not configured, using localStorage fallback");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("check_ins")
      .select("*")
      .order("check_in_time", { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching latest check-in:", error);
    return null;
  }
}

export async function getAllCheckIns(): Promise<CheckIn[]> {
  if (!supabase) {
    console.warn("Supabase not configured, using localStorage fallback");
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("check_ins")
      .select("*")
      .order("check_in_time", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching check-ins:", error);
    return [];
  }
}