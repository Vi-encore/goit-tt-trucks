import {  PuffLoader } from 'react-spinners'
import css from './Loader.module.css'

export default function Loader() {
  return <div className={css.container}>
    <PuffLoader
          color="#d15065"
          cssOverride={{ margin: '20px 0' }}
          size="150px"
          className={css.loader}
        />
  </div>
}