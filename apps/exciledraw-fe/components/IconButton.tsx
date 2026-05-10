
import { ReactNode } from "react";

export function IconButton({
    icon, onClick, activated, title
}:{
    icon: ReactNode,
    onClick: () => void,
    activated: boolean,
    title?: string,
}){
    return <button
        className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
            activated
                ? "border-rose-300 bg-white text-rose-500 shadow-[0_0_18px_rgba(251,113,133,0.35)]"
                : "border-white/40 bg-black/70 text-white hover:border-white hover:bg-white/10"
        }`}
        onClick={onClick}
        title={title}
        type="button"
    >
            {icon}
    </button>
}
