import { useSelector } from 'react-redux';
import css from './CatalogPage.module.css';
import { selectCampers, selectLoading } from '../../redux/campersSlice';
import { MoonLoader } from 'react-spinners';

export default function CatalogPage() {
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectLoading);

  console.log(campers);

  return (
    <>
      {isLoading && (
        <MoonLoader
          color="#d15065"
          cssOverride={{ margin: '20px 0' }}
          size="80px"
        />
      )}


    </>
  );
}
