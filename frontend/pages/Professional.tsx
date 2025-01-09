import { Component, onMount } from "solid-js";
import professional_default_image from "../assets/professional_default_image.jpg";
import { Calendar } from "@fullcalendar/core";
import { getApiUrl } from "../utils";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface ProfessionalProps {
  profilePicture: string;
  name: string;
  type: string;
  address: string;
}

interface Appointment {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  numberOfPersons: number;
}

const Professional: Component = (props: any) => {
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
        initialView: "dayGridWeek",
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

  return (
    <div class="border join border-secondary">
      <div class="join-item flex flex-col gap-4 p-4 border-r w-80 border-secondary">
        <div class="flex items-center gap-4 w-full">
          <img src={props.profilePicture || professional_default_image} alt="Professional Profil Picture" class="w-16 h-16 rounded-lg" />
          <div class="flex h-full flex-col justify-around">
            <h3 class="text-lg text-accent">{props.name || "Piscine Molitor"}</h3>

            <div class="flex items-center gap-2">
              <div class="flex items-center gap-2">
                <span class="icon-[hugeicons--building-03]"></span>
              </div>
              {props.type || "Piscine"}
            </div>
          </div>
        </div>
        <a class="link flex items-center gap-2" href={`https://www.google.fr/maps/place/${props.address || "Rue de la Tradition, 59650 Villeneuve-d'Ascq"}`} target="_blank" rel="noreferrer">
          <div class="flex items-center gap-2">
            <span class="icon-[bx--map]" style="width: 1em; height: 1em;" />
          </div>
          {props.address || "1 rue de Paris, 75000 Paris"}
        </a>
        <button class="btn btn-primary">Nouveau Rendez-Vous</button>
      </div>
      <div class="p-4 join-item">
        <div class="container mx-auto p-4">
          <div ref={(el) => (calendarEl = el)} />
        </div>
      </div>
    </div>
  );
};

export default Professional;
