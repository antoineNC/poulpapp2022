export interface Event {
    id: string;
    titre: string;
    date: string
    bleu: number;
    jaune: number;
    orange: number;
    rouge: number;
    vert: number;
  }
  
  class EventService {
    public events: Array<Event> = [
      {
        id: "1",
        titre: "Blind test",
        date: "04/03/2022",
        bleu: 0,
        jaune:0,
        orange:0,
        rouge:0,
        vert:0,
      },
    ]
  
    // Return all post asynchronously. Returns a Promise
    getAll(): Promise<Array<Event>> {
      return new Promise((resolve) => {
        resolve(this.events);
      });
    }
  
    add(event: Event) {
      // Add new post at beginning of array
      this.events = [event, ...this.events];
    }
  
    remove(id: string) {
      this.events = this.events.filter((event: Event) => event.id !== id);
    }
  
    update(eventUpdated: Event){
      this.remove(eventUpdated.id);
      this.add(eventUpdated)
    }
  }
  
  export default new EventService();