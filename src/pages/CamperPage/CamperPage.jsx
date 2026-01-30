import { useDispatch, useSelector } from 'react-redux';
import css from './CamperPage.module.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchCamperById } from '../../redux/campers/campersOps';
import { selectCamper } from '../../redux/campers/campersSlice';

export default function CamperPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  const camper = useSelector(selectCamper)
  console.log(camper);
  return <p>I am camper page</p>;
}
