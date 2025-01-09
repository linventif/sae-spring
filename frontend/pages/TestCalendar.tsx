import { Component, createSignal, For, onMount } from "solid-js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from "@fullcalendar/core";
import { getApiUrl } from "../utils";
import flatpickr from "flatpickr";

interface Appointment {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  numberOfPersons: number;
}

const TestFlatPickr: Component = () => {
  let element: HTMLInputElement | undefined;

  onMount(() => {
    if (element) {
      flatpickr(element, {});
    }
  });

  return <input type="text" class="input max-w-sm" placeholder="YYYY-MM-DD" ref={(el) => (element = el)} />;
};

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
        // events: [
        //   { title: "Event 1", start: "2025-01-10" },
        //   { title: "Event 2", start: "2025-01-12" },
        // ],
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

  const [newAppointmentData, setNewAppointmentData] = createSignal({
    ownerInfo: {
      firstName: "",
      lastName: "",
      email: "",
    },
    participants: [],
  });

  return (
    <>
      <button type="button" class="btn btn-primary" aria-haspopup="form" aria-expanded="false" aria-controls="middle-center-modal" data-overlay="#middle-center-modal">
        Nouveau Rendez-Vous
      </button>

      <div class="bg-base-100 w-full rounded-lg shadow">
        <h5 class="bg-base-300 rounded-t-lg p-4 text-base text-xl font-bold">Nouveaux Rendez-Vous</h5>
        <div class="w-full p-4">
          <form class="needs-validation peer grid gap-y-4" noValidate>
            <div class="w-full">
              <h6 class="text-lg font-semibold">Informations du compte</h6>
              <hr class="mb-4 mt-2" />
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label class="label label-text" htmlFor="firstName">
                  Prénom
                </label>
                <input id="firstName" type="text" placeholder="John" class="input" required />
                <span class="error-message">Entrez votre prénom.</span>
              </div>
              <div>
                <label class="label label-text" htmlFor="lastName">
                  Nom
                </label>
                <input id="lastName" type="text" placeholder="Doe" class="input" required />
                <span class="error-message">Entrez votre nom.</span>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label class="label label-text" htmlFor="userEmail">
                  Email
                </label>
                <input id="userEmail" type="email" class="input" placeholder="john@gmail.com" aria-label="john@gmail.com" required="" />
                <span class="error-message">Entrez une adresse email valide.</span>
              </div>
            </div>
            <div class="w-full">
              <h6 class="text-lg font-semibold">Informations du rendez-vous</h6>
              <hr class="mb-4 mt-2" />
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/*  nombre de participant */}
              <div>
                <label class="label label-text" htmlFor="numberOfPersons">
                  Nombre de participants
                </label>
                <input id="numberOfPersons" type="number" className="input" placeholder="1" required />
                <span class="error-message">Entrez le nombre de participants.</span>
              </div>
              {/*  créneau horaire (heure de début et de fin) */}
              <div>
                <label class="label label-text" htmlFor="startDate">
                  Date et heure de début
                </label>
                <input id="startDate" type="datetime-local" className="input" required />
                <span class="error-message">Entrez la date et heure de début.</span>
              </div>
              <TestFlatPickr />
            </div>
            <div class="mt-4">
              <button type="submit" name="submitButton" class="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="container mx-auto p-4">
        <div ref={(el) => (calendarEl = el)} />
      </div>
    </>
  );
};

export default TestCalendar;
