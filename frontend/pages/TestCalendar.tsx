import { Component, onMount } from "solid-js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from "@fullcalendar/core";
import { getApiUrl } from "../utils";

interface Appointment {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  numberOfPersons: number;
}

const TestCalendar: Component = () => {
  let calendarEl: HTMLDivElement | undefined;
  let calendar: Calendar | undefined;

  async function fetchAndAddAppointments(calendar: Calendar) {
    const response = await fetch(`${getApiUrl()}/api/appointments?fromDate=${calendar.view.activeStart.toISOString()}&toDate=${calendar.view.activeEnd.toISOString()}`);
    if (response.ok) {
      const appointments: Appointment[] = await response.json();
      const newEvents = appointments
        .filter((appointment) => !calendar.getEventById(appointment.id))
        .map((appointment) => ({
          id: appointment.id,
          title: appointment.title,
          start: appointment.startDate,
          end: appointment.endDate,
        }));

      calendar.addEventSource(newEvents);
    }
  }

  onMount(async () => {
    if (calendarEl) {
      calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        firstDay: 1,
        locale: "fr",
        selectable: true,
        initialDate: new URLSearchParams(window.location.search).get("date") || undefined,
        events: [
          { title: "Event 1", start: "2025-01-10" },
          { title: "Event 2", start: "2025-01-12" },
        ],
        dateClick: (info) => {
          const title = prompt("Enter event title");
          if (title) {
            calendar?.addEvent({ title, start: info.dateStr });
          }
        },
        // on click of pagination log the date
        datesSet: async (dateInfo) => {
          if (calendar) {
            await fetchAndAddAppointments(calendar);
          }
        },
      });
      calendar.render();
    }
  });

  return (
    <>
      <button type="button" class="btn btn-primary" aria-haspopup="dialog" aria-expanded="false" aria-controls="middle-center-modal" data-overlay="#middle-center-modal">
        Middle center
      </button>

      <div id="middle-center-modal" class="overlay modal overlay-open:opacity-100 modal-middle hidden" role="dialog" tabindex="-1">
        <div class="modal-dialog overlay-open:opacity-100">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Dialog Title</h3>
              <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" data-overlay="#middle-center-modal">
                <span class="icon-[tabler--x] size-4"></span>
              </button>
            </div>
            <div class="modal-body">
              This is some placeholder content to show the scrolling behavior for modals. Instead of repeating the text in the modal, we use an inline style to set a minimum height, thereby extending
              the length of the overall modal and demonstrating the overflow scrolling. When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-soft btn-secondary" data-overlay="#middle-center-modal">
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto p-4">
        <div ref={(el) => (calendarEl = el)} />
      </div>
    </>
  );
};

export default TestCalendar;
