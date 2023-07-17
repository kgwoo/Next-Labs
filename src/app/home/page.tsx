import { NextPage } from "next/types";
import * as CanvasView from "@/view/canvas";

const Homes: NextPage = () => {
    return (
        <div>
            <div>Canvas Study</div>
            <CanvasView.CanvasImageView />
            {/* <CanvasView.CanvasView /> */}
        </div>
    );
};

export default Homes;
