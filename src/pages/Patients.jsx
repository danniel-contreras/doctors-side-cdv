import { lazy, Suspense, useEffect, useState } from "react";
import InputSearch from "../components/Global/SearchInput";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { readAllPatients } from "../redux/actions/patients";
import Loader from "../components/Global/Loader";
const List = lazy(() => import("../components/Patients/List"));
const Pagination = lazy(() => import("../components/Global/Pag"));

export default function Patients() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({ name: "", custom: "" });
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patient.data);

  useEffect(() => {
    return dispatch(readAllPatients(page, search.name, search.custom, 20));
  }, [dispatch, page, search]);
  return (
    <Layout>
      <div className="px-8">
        <p className="mb-4 text-3xl font-thin">Listado de pacientes</p>
        <div style={{ width: "100%" }} className="grid grid-cols-2 gap-5">
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
        <Suspense fallback={<Loader />}>
          <div>
            <List patients={patients} />
            <Pagination
              last={patients?.totalpages}
              className="pagination-bar"
              onPageChange={setPage}
              totalCount={patients?.totalItems}
              currentPage={patients?.currentPage}
              pageSize={patients?.take}
            />
          </div>
        </Suspense>
      </div>
    </Layout>
  );
}
