export class SSEClient {
  private eventSource: EventSource | null = null;

  connectToOrderStream(orderId: string, onMessage: (data: any) => void, onError?: (error: any) => void) {
    this.disconnect();
    
    this.eventSource = new EventSource(`http://localhost:5000/api/orders/${orderId}/stream`);
    
    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
        
        // Auto-close when order is delivered
        if (data.status === 'DELIVERED') {
          setTimeout(() => this.disconnect(), 2000);
        }
      } catch (error) {
        console.error('SSE parse error:', error);
      }
    };

    this.eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      onError?.(error);
      this.disconnect();
    };
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}

export const sseClient = new SSEClient();