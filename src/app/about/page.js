import PageHeader from '@/components/pageHeader';

const About = () => {
  return (
    <div>
      <PageHeader
        header="About Us"
        description="We are a group of passionate people who are passionate about cooking
            and sharing our knowledge with the world."
        img="url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      />
      <h2 className="text-3xl font-bold mb-8 text-accent ml-4">About Us</h2>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold mb-4 ml-4">Our Mission</h3>
          <p className="text-gray-700 ml-4 mb-16">
            At the heart of our platform lies a simple yet powerful idea: to
            create a vibrant community centered around the joy of cooking,
            baking, and all things food-related. Our app empowers users to not
            only explore an extensive collection of recipes and blog posts but
            also to contribute their own culinary creations. We strive to be a
            social media-like hub where food enthusiasts can connect, share, and
            celebrate their passion, fostering a culture of learning,
            inspiration, and camaraderie.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold mb-4 ml-4">Our Vision</h3>
          <p className="text-gray-700 mb-16 ml-4">
            We aspire to be more than just an app; we aim to be a global
            community where food lovers from all corners of the world can come
            together to share their love for gastronomy. Our vision is to
            cultivate a platform that not only showcases diverse recipes and
            culinary insights but also encourages experimentation, creativity,
            and cultural exchange. By providing a welcoming space for food
            enthusiasts to connect, collaborate, and grow, we hope to inspire a
            new generation of home cooks, professional chefs, and food bloggers
            to explore, innovate, and flourish in the culinary arts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
