import { NextRequest } from "next/server";
import DashboardController from "@/controllers/DashboardController";

export async function GET(request: NextRequest) {
  return await DashboardController.estatisticasGerais(request);
}