import { currentUser } from "@clerk/nextjs";

const ContactForm = async () => {
  const user = await currentUser();

  return (
    <div className="bg-gray-200 p-8 rounded-lg shadow-md max-w-md mx-auto mt-10 mb-10">
      <form
        action="https://formspree.io/f/xknldnpk"
        method="POST"
        className="space-y-4"
      >
        <div className="hidden">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={`${user.firstName} ${user.lastName}`}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your name"
          />
        </div>

        <div className="hidden">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={user.emailAddresses[0].emailAddress}
            readOnly
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows="4"
            className="mt-1 p-2 w-full border rounded-md text-black bg-white"
            placeholder="Enter your message"
          ></textarea>
        </div>

        <button
          type="submit"
          style={{ backgroundColor: "#EE6F57" }}
          className="mt-4 w-full text-white p-2 rounded-md hover:bg-yellow-500 hover:scale-105 active:scale-100 transition transform duration-200 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
