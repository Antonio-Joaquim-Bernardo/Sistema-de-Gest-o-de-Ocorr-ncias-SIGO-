import { NextResponse } from "next/server";
import AuthController from "@/controllers/AuthController";

export async function POST() {
  return await AuthController.logout();
}