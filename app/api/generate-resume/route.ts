import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(request: Request) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return Response.json(
        { error: "Google AI API key not configured" },
        { status: 500 }
      );
    }

    const cvData = await request.json();

    const prompt = `
You are a professional resume writer. Enhance and improve the following resume data while maintaining all original information. Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, just pure JSON):

{
  "personalInfo": {
    "firstName": "enhanced first name",
    "lastName": "enhanced last name",
    "phone": "phone number",
    "email": "email",
    "address": "address",
    "city": "city",
    "state": "state",
    "zipCode": "zipCode",
    "country": "country",
    "portfolio": "portfolio url",
    "linkedin": "linkedin url"
  },
  "jobTitle": "enhanced professional job title",
  "careerSummary": "enhanced 3-4 sentence professional summary highlighting key achievements and expertise",
  "skills": ["skill1", "skill2", "skill3", ...],
  "workExperience": [
    {
      "jobTitle": "job title",
      "company": "company name",
      "startDate": "start date",
      "endDate": "end date",
      "description": "enhanced 2-3 sentence description with achievements and impact"
    }
  ],
  "education": [
    {
      "degree": "degree name",
      "institution": "institution name",
      "major": "major/field",
      "startDate": "start",
      "endDate": "end"
    }
  ],
  "certifications": [
    {
      "title": "certification name",
      "organization": "org name",
      "issueDate": "date",
      "description": "brief description"
    }
  ]
}

Original Data:
${JSON.stringify(cvData, null, 2)}

Instructions:
- Keep all original data but make it more professional and impactful
- Enhance job descriptions to highlight achievements and quantifiable results
- Improve career summary to be compelling and keyword-rich
- Keep the same structure, just improve the wording
- Return ONLY the JSON object, no other text
`;

    const result = await generateText({
      model: google("gemini-2.5-flash-lite"),
      prompt,
      maxOutputTokens: 3000,
    });

    // Parse AI response and ensure it's valid JSON
    let enhancedData: any;
    try {
      const cleanText = result.text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      enhancedData = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", result.text);
      enhancedData = cvData;
    }

    return Response.json({ resume: enhancedData });
  } catch (error) {
    console.error("Error generating resume:", error);
    return Response.json({ error: "Failed to generate resume" }, { status: 500 });
  }
}
