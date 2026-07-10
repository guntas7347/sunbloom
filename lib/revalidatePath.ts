"use server";

import { revalidatePath as rp, updateTag as ut } from "next/cache";

export async function revalidatePaths(paths: string[]) {
  for (const p of paths) {
    rp(p);
  }
}

export async function revalidateOath(tags: string[]) {
  for (const t of tags) {
    ut(t);
  }
  rp("/oath");
}
