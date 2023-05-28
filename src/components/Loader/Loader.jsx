import { ColorRing } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <ColorRing
      visible={true}
      height="360"
      width="360"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass={css.Loader}
      colors={['#ccd5ae', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff']}
    />
  );
}
