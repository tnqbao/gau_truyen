import React, { useContext, useState, useNavigate, useRef} from "react";
import { GlobalContext } from "../../context/GlobalContext";
const Header = () => {
    const { handleCategorySearch, setCategory } = useContext(GlobalContext);
    // const [searchTerm, setSearchTerm] = useState("");
    // const [searchOpen, setSearchOpen] = useState(false);
    // // const navigate = useNavigate();
    // const toggleSearchButtonRef = useRef(null);
    return (
        <div className="bg-black p-3">
        </div>
    )
};

export default Header;