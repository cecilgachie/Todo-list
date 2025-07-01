import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { transactionId: string } }) {
  try {
    const { transactionId } = params

    // Simulate checking payment status
    // In a real implementation, you would query your database
    // or check with Safaricom's callback status

    // Simulate random success/pending for demo
    const random = Math.random()
    let status = "pending"

    // 70% chance of success after some time
    if (random > 0.3) {
      status = "completed"
    }

    return NextResponse.json({
      transactionId,
      status,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Status check error:", error)
    return NextResponse.json({ status: "failed", message: "Status check failed" }, { status: 500 })
  }
}
