// pages/recipes/[category].js or app/recipes/[category].js
import { useRouter } from 'next/router';
import CategoryRecipes from '../../components/CategoryRecipes';

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  return <CategoryRecipes category={category} />;
};

export default CategoryPage;
