import { useEffect, useState } from "react";
import InputSearch from "../components/Global/SearchInput";
import List from "../components/Patients/List";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { readAllPatients } from "../redux/actions/patients";
import Pagination from "../components/Global/Pagination";

export default function Patients() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({ name: "", custom: "" });
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patient.data);

  useEffect(() => {
    return dispatch(readAllPatients(page, search.name, search.custom, 8));
  }, [dispatch,page,search]);
  return (
    <Layout>
      <div className="px-8">
        <p className="mb-4 text-3xl font-thin">Listado de pacientes</p>
        <div style={{ width: "90%" }} className="grid grid-cols-2 gap-5">
          <InputSearch
            placeholder="Escribe el nombre de la mascota para buscar"
            label="Buscar por nombre del paciente"
            handleChange={(e) =>
              setSearch({ ...search, name: e.currentTarget.value })
            }
          />
          <InputSearch
            placeholder="Escribe el nombre del dueño de la mascota para buscar"
            label="Buscar por dueño del paciente"
            handleChange={(e) =>
              setSearch({ ...search, custom: e.currentTarget.value })
            }
          />
        </div>
        <List patients={patients} />
        <Pagination data={patients?.ok && patients} method={setPage} />
      </div>
    </Layout>
  );
}
