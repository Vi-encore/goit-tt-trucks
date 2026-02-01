import css from './ImageWithLoader.module.css';
import { PuffLoader } from 'react-spinners';
import { useState } from 'react';

export default function ImageWithLoader({ src, alt,  }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div className={css.loader}>
          <PuffLoader color="#e44848" size="100px" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={` ${isLoaded ? css.visible : css.hidden}`}
      />
    </>
  );
}
