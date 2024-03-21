
import PageHeader from "@/components/pageHeader"

export default function Page() {

    return (
        <div className="min-h-full flex flex-col items-center">
            <PageHeader header={'Recipe Details'} description={'recipe description'} img={"url('/images/4.avif')"} />
            <h1>Recipe</h1>
        </div>
    )
}