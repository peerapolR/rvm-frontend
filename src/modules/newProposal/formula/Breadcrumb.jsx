import { Breadcrumb } from "antd";
import HomeIcon from "@icons/HomeIcon";

export default function BreadCrumb() {
  return (
    <>
      <Breadcrumb separator=">">
        <Breadcrumb.Item className="text-revomed-secondary">
          <HomeIcon />
          Formulation
        </Breadcrumb.Item>
        <Breadcrumb.Item>Dosage</Breadcrumb.Item>
        <Breadcrumb.Item>Formula</Breadcrumb.Item>
        <Breadcrumb.Item>Ingredients</Breadcrumb.Item>
        <Breadcrumb.Item>Packaging</Breadcrumb.Item>
        <Breadcrumb.Item>Proposal</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}
