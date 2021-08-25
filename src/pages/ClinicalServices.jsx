import { useEffect } from "react";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { readClinicalServices } from "../redux/actions/clinicalService";
import List from "../components/ClinicalServices/List";

export default function ClinicalServices() {
  const dispatch = useDispatch();
  useEffect(() => {
    return dispatch(readClinicalServices());
  }, [dispatch]);
  const clinicalServices = useSelector((state) => state.clinicalService.data);
  return (
    <Layout>
      <div className=" mx-10">
        <p className="mb-4 text-2xl font-thin">Listado de servicios clinicos</p>
        <div className="grid grid-cols-3 gap-20 mt-4">
          <List clinicalServices={clinicalServices} />
        </div>
      </div>
    </Layout>
  );
}
