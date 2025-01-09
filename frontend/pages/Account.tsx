import type { Component } from "solid-js";

const Account: Component = () => {
  return (
    <>
      <script src="/node_modules/lodash/lodash.js"></script>
      <script src="/node_modules/dropzone/dist/dropzone-min.js"></script>

      <div
        data-file-upload='{
          "url": "/upload",
          "acceptedFiles": "image/*",
          "maxFiles": 1,
          "singleton": true
        }'
      >
        <template data-file-upload-preview="">
          <div class="size-20">
            <img class="w-full rounded-full object-contain" data-dz-thumbnail="" />
          </div>
        </template>

        <div class="flex flex-wrap items-center gap-3 sm:gap-5">
          <div class="group" data-file-upload-previews="" data-file-upload-pseudo-trigger="">
            <span class="border-base-content/30 text-base-content/50 flex size-20 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-dotted hover:bg-base-200/60 group-has-[div]:hidden">
              <span class="icon-[tabler--user-circle] size-9 shrink-0"></span>
            </span>
          </div>
          <div class="grow">
            <div class="flex items-center gap-x-2">
              <button type="button" class="btn btn-primary" data-file-upload-trigger="">
                <span class="icon-[tabler--upload] size-4 shrink-0"></span>
                Upload photo
              </button>
              <button type="button" class="btn btn-outline btn-secondary" data-file-upload-clear="">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
