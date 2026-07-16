import { SupabaseClient } from "@supabase";

export async function fileCatcher(
  supabase: SupabaseClient,
  filePath: string
) {
  const { data: file, error: fileError } = await supabase.storage
    .from("documents")
    .download(filePath);

  if (fileError || !file) {
    throw new Error("Arquivo não encontrado no Storage.");
  }

  return file;
}