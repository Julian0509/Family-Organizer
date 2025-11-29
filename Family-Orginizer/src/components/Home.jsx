import Layout from "./Layout";
function Home() {
  return (
    <div>
        <Layout />
        <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
        <h4 className="text-lg font-semibold">Swimming Lesson</h4>
        <p className="text-sm text-gray-600">16:15 – 17:00</p>
        <p className="text-sm">Location: City Pool</p>

        <div className="flex gap-2 flex-wrap mt-2">
        <span className="bg-gray-200 px-2 py-1 rounded text-xs">Towel</span>
        <span className="bg-gray-200 px-2 py-1 rounded text-xs">Swim Bag</span>
        </div>
        </div>
    </div>
  );
}
export default Home; 
