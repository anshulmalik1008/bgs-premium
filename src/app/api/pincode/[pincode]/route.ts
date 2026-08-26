import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: {
    params: Promise<{
      pincode: string;
    }>;
  },
) {
  try {
    const { pincode } = await context.params;

    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid PIN code.",
        },
        { status: 400 },
      );
    }

    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`,
      {
        cache: "no-store",
      },
    );

    const data = await response.json();

    const result = data?.[0];

    if (
      result?.Status !== "Success" ||
      !result?.PostOffice?.length
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "PIN code not found.",
        },
        { status: 404 },
      );
    }

    const postOffice = result.PostOffice[0];

    return NextResponse.json({
      success: true,

      location: {
        city: postOffice.District ?? "",
        state: postOffice.State ?? "",
        country: postOffice.Country ?? "India",
      },
    });
  } catch (error) {
    console.error(
      "PIN lookup failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "PIN code lookup failed.",
      },
      { status: 500 },
    );
  }
}