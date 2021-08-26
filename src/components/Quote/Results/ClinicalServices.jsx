import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {readClinicalServices} from "../../../redux/actions/clinicalService"

export default function ClinicalServices({id}) {
    const clinicalServices = useSelector((state)=>state.clinicalService.data)
    const dispatch = useDispatch()
    useEffect(() => {
        return dispatch(readClinicalServices())
    }, [dispatch])
    console.log(clinicalServices)
    return (
        <div>
            
        </div>
    )
}
