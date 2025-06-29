import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/newer/config';

async function deleteTavusConversation(conversationId: string) {

   const options = {method: 'DELETE', headers: {'x-api-key': config.TAVUS_API_KEY}};

fetch(`https://tavusapi.com/v2/conversations/${conversationId}`, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get('conid');
  if (!conversationId) {
    console.error('No conversation ID provided');
    return NextResponse.redirect(`${request.nextUrl.origin}?message=${encodeURIComponent('No conversation ID provided')}`);
  }
  try {
    await deleteTavusConversation(conversationId);
    return NextResponse.redirect(`${request.nextUrl.origin}/`);
  } catch (error: any) {
    console.error('Delete conversation error:', error);
    return NextResponse.redirect(`${request.nextUrl.origin}/?message=${encodeURIComponent('Call not ended')}`);
  }
}