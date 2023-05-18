import React from "react";

import CardProfile from "components/Cards/CardProfile.js";
import CardProfileForm from "components/Cards/CardProfileForm";

export default function Profile() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardProfileForm />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}
