export const metadata = {
    title: "Flavour.Voyage - New Recipe",
    description: "Add a new recipe for the everyone",
  };
  
  export default async function RecipesLayout({ children }) {
    return (
        <main>{children}</main>
    );
  }