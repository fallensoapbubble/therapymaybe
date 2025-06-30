import { NextRequest, NextResponse } from 'next/server';

async function deleteTavusConversation(conversationId: string): Promise<void> {
    const apiKey = process.env.TAVUS_API_KEY;
    if (!apiKey) {
        throw new Error('TAVUS_API_KEY is not defined');
    }
    
    const response = await fetch(
        `https://tavusapi.com/v2/conversations/${conversationId}`, 
        {
            method: 'DELETE',
            headers: { 'x-api-key': apiKey }
        }
    );

    // Handle successful response (204 No Content)
    if (response.ok) {
        console.log(`Successfully deleted conversation ${conversationId}`);
        return;
    }

    // Handle error responses
    let errorMessage = `Failed to delete conversation: ${response.status}`;
    try {
        const errorData = await response.json();
        errorMessage += ` - ${errorData.message || JSON.stringify(errorData)}`;
    } catch {
        const text = await response.text();
        if (text) errorMessage += ` - ${text}`;
    }
    
    throw new Error(errorMessage);
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conid');
    
    if (!conversationId) {
        console.error('No conversation ID provided');
        return NextResponse.redirect(
            `${request.nextUrl.origin}?message=${encodeURIComponent('No conversation ID provided')}`
        );
    }

    try {
        await deleteTavusConversation(conversationId);
        return NextResponse.redirect(
            `${request.nextUrl.origin}/?message=${encodeURIComponent('Call ended successfully')}`
        );
    } catch (error: any) {
        console.error('Delete conversation error:', error);
        return NextResponse.redirect(
            `${request.nextUrl.origin}/?message=${encodeURIComponent(error.message || 'Call not ended')}`
        );
    }
}