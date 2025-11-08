// src/components/Contact.jsx
export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Contact</h2>
        <form className="flex flex-col space-y-4">
          <input type="text" placeholder="Name" className="p-3 rounded border border-gray-300"/>
          <input type="email" placeholder="Email" className="p-3 rounded border border-gray-300"/>
          <textarea placeholder="Message" className="p-3 rounded border border-gray-300"></textarea>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
