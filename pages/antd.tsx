import { Button } from "antd";
import { MainLayout } from "~/components/layout";

export interface AboutProps {}

export default function About(props: AboutProps) {
  return (
    <div>
      <Button type="primary">Button</Button>
    </div>
  );
}

About.Layout = MainLayout;
