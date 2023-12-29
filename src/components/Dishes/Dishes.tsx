import React, {useEffect} from 'react';
import {selectDeleteDishLoading, selectDishes, selectFetchDishLoading} from '../../store/dishes/dishesSlice';
import {deleteDish, fetchDishes} from '../../store/dishes/dishesThunks';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import DishItem from './DishItem';
import Spinner from '../Spinner/Spinner';

const Dishes: React.FC = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const dishesLoading = useAppSelector(selectFetchDishLoading);
  const deleteLoading = useAppSelector(selectDeleteDishLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const removeDish = async (id: string) => {
    await dispatch(deleteDish(id));
    await dispatch(fetchDishes());
  };

  return (
    <>
      <h4>Dishes</h4>
      {dishesLoading ? <Spinner/> : dishes.map((dish) => (
        <DishItem
          key={dish.id}
          dish={dish}
          deleteLoading={deleteLoading}
          onDelete={() => removeDish(dish.id)}
        />
      ))}
    </>
  );
};

export default Dishes;