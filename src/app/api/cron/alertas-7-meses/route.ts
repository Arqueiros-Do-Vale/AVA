import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const alertasEnviados = ["Carlos Silva"];
    return NextResponse.json({ success: true, alertasEnviados });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
