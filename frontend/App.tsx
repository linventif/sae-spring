import type { Component } from "solid-js";

const App: Component = () => {
  return (
    <div>
      <button className="btn">Hello daisyUI</button>
      <div className="accordion divide-neutral/20 divide-y">
        <div className="accordion-item active" id="payment-basic">
          <button
            className="accordion-toggle inline-flex items-center gap-x-4 text-start"
            aria-controls="payment-basic-collapse"
            aria-expanded="true"
          >
            <span className="icon-[tabler--plus] accordion-item-active:hidden text-base-content size-4.5 block shrink-0"></span>
            <span className="icon-[tabler--minus] accordion-item-active:block text-base-content size-4.5 hidden shrink-0"></span>
            When is payment taken for my order?
          </button>
          <div
            id="payment-basic-collapse"
            className="accordion-content w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="payment-basic"
            role="region"
          >
            <div className="px-5 pb-4">
              <p className="text-base-content/80 font-normal">
                Payment is taken during the checkout process when you pay for your order. The order number that appears
                on the confirmation screen indicates payment has been successfully processed.
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item" id="delivery-basic">
          <button
            className="accordion-toggle inline-flex items-center gap-x-4 text-start"
            aria-controls="delivery-basic-collapse"
            aria-expanded="false"
          >
            <span className="icon-[tabler--plus] accordion-item-active:hidden text-base-content size-4.5 block shrink-0"></span>
            <span className="icon-[tabler--minus] accordion-item-active:block text-base-content size-4.5 hidden shrink-0"></span>
            How would you ship my order?
          </button>
          <div
            id="delivery-basic-collapse"
            className="accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="delivery-basic"
            role="region"
          >
            <div className="px-5 pb-4">
              <p className="text-base-content/80 font-normal">
                For large products, we deliver your product via a third party logistics company offering you the “room
                of choice” scheduled delivery service. For small products, we offer free parcel delivery.
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item" id="cancel-basic">
          <button
            className="accordion-toggle inline-flex items-center gap-x-4 text-start"
            aria-controls="cancel-basic-collapse"
            aria-expanded="false"
          >
            <span className="icon-[tabler--plus] accordion-item-active:hidden text-base-content size-4.5 block shrink-0"></span>
            <span className="icon-[tabler--minus] accordion-item-active:block text-base-content size-4.5 hidden shrink-0"></span>
            Can I cancel my order?
          </button>
          <div
            id="cancel-basic-collapse"
            className="accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="cancel-basic"
            role="region"
          >
            <div className="px-5 pb-4">
              <p className="text-base-content/80 font-normal">
                Scheduled delivery orders can be cancelled 72 hours prior to your selected delivery date for full
                refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
