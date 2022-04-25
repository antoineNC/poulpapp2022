export interface Event {
    id: string;
    titre: string;
    date: string
    bleu: string;
    jaune: string;
    orange: string;
    rouge: string;
    vert: string;
  }
  
  class EventService {
    public events: Array<Event> = [
      {
        id: "1",
        titre: "Blind test",
        date: "04/03/2022",
        bleu: "10",
        jaune:"4",
        orange:"15",
        rouge:"13",
        vert:"11",
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