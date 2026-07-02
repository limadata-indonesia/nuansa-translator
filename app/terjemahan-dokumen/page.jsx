import ServiceLanding from "@/components/ServiceLanding";
import { getService } from "@/lib/services";

const data = getService("terjemahan-dokumen");

export const metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: `/${data.slug}` },
};

export default function Page() {
  return <ServiceLanding data={data} />;
}
