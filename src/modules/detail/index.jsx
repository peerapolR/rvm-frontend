import React, { useParams, useEffect } from "react";
import { useRouter } from "next/navigation";

import Title from "antd/es/typography/Title";
import BackIcon from "@icons/BackIcon";
import EditIcon from "@icons/EditIcon";
import SubMenuIcon from "@icons/SubMenuIcon";

import { useIngredientCTX } from "@contexts/IngredientContext";

export default function Page({ _id }) {
  const router = useRouter();
  const ctx = useIngredientCTX();
  const { fetchIngredientById, ingredientById: ingredient } = ctx;

  useEffect(() => {
    fetchIngredientById(_id);
  }, []);

  return (
    <>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div
            className="bg-revomed-primary-light2 w-[40px] h-[40px] rounded-lg items-center flex justify-center mr-5 cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            <BackIcon />
          </div>
          <Title level={4} style={{ color: "#004D7D" }}>
            Ingredient Detail
          </Title>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-3 bg-revomed-white rounded-lg w-full p-5">
            <div>Image</div>
            <div className="flex flex-col">
              <div className="relative mb-5">
                <p className="text-revomed-primary font-semibold text-base">
                  {ingredient.ingredient_name}
                  <span
                    className={`absolute h-[8px] w-[8px] rounded-full ${
                      ingredient.ingredient_status === "draft"
                        ? "bg-gray-500"
                        : ingredient.ingredient_status === "publish"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }  top-2 ml-5`}
                  />
                  <span className="ml-10 text-revomed-black font-normal">
                    {ingredient.ingredient_status}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-revomed-primary">Clinical Dose (mg/day)</p>
                <p>{ingredient.dose_clinical}</p>
              </div>
              <div>
                <p className="text-revomed-primary">Lead time (Days)</p>
                <p>{ingredient.leadTime}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-3 justify-end flex">
                <div
                  className="cursor-pointer bg-revomed-primary-light2 rounded-lg p-2"
                  onClick={() => {
                    router.push(`/main/ingredient/ingredientEdit/${ingredient._id}`);
                  }}
                >
                  <EditIcon />
                </div>
                <div
                  className="ml-5 cursor-pointer bg-revomed-light-grey3 rounded-lg p-2"
                  onClick={() => {
                    console.log("sub menu");
                  }}
                >
                  <SubMenuIcon />
                </div>
              </div>
              <div>
                <p className="text-revomed-primary">
                  Recommended Dose (mg/day)
                </p>
                <p>
                  {ingredient.dose_min} - {ingredient.dose_max}
                </p>
              </div>
              <div>
                <p className="text-revomed-primary">Price/Kg (THB)</p>
                <p>
                  {ingredient.price_min} - {ingredient.price_max}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-revomed-white rounded-lg w-full p-5">
            <div className="grid grid-cols-2">
              <div>
                <p className="text-revomed-primary text-base font-semibold">
                  Chemical Composition
                </p>
                <p className=" whitespace-pre-line">
                  {ingredient.chemical_comp}
                </p>
              </div>
              <div>
                <p className="text-revomed-primary text-base font-semibold">
                  Certification
                </p>
                <p className=" whitespace-pre-line">{ingredient.cert}</p>
              </div>
            </div>
            <hr className="my-5" />
            <div className="grid grid-cols-2">
              <div>
                <p className="text-revomed-primary text-base font-semibold">
                  Health Benefits
                </p>
                <p className=" whitespace-pre-line">
                  {ingredient.health_benefits}
                </p>
              </div>
              <div>
                <p className="text-revomed-primary text-base font-semibold">
                  Exclusive Health Benefits
                </p>
                <p className=" whitespace-pre-line">
                  {ingredient.ex_health_benefits}
                </p>
              </div>
            </div>
            <hr className="my-5" />
            <div className="mb-5">
              <p className="text-revomed-primary text-base font-semibold">
                Formulation
              </p>
              <div className="flex">
                {ingredient?.formulation?.length > 0
                  ? ingredient.formulation.map((ingre, idx) => [
                      <p
                        className="h-[33px] px-3 py-1.5 text-revomed-primary bg-revomed-primary-light2 rounded-lg mr-3"
                        key={idx}
                      >
                        {ingre}
                      </p>,
                    ])
                  : ""}
              </div>
            </div>
            <div className="mb-5">
              <p className="text-revomed-primary text-base font-semibold">
                Incompatibility Ingredient
              </p>
              <div className="flex">
                {ingredient?.incomp_Ingredient?.length > 0
                  ? ingredient.incomp_Ingredient.map((incomp, idx) => [
                      <p
                        className="h-[33px] px-3 py-1.5 text-revomed-primary bg-revomed-primary-light2 rounded-lg mr-3"
                        key={idx}
                      >
                        {incomp}
                      </p>,
                    ])
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
