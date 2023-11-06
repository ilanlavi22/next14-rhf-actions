import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  // Do something with the data ?  
  // Return the data in JSON format
    return NextResponse.json(data);
}