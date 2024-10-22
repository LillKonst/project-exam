import { useNavigate } from "react-router-dom";
import { useCart } from "../../../../context/CartContext";
import PropTypes from "prop-types";

function CartIcon({ className }) {
    const navigate = useNavigate(); // Get the navigate function
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    // Handler for click event
    const handleClick = () => {
        navigate('/CartIcon'); // Redirect to the Checkout page
    };

    return (
        <div className={`ml-auto relative w-10 h-25 flex justify-center cursor-pointer ${className}`} 
            onClick={handleClick} // Add the click handler here
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
            </svg>

            {cartCount > 0 && (
                <span className="absolute top-5 pb-1 right-0 -translate-x-1/2 -translate-y-1/2 text-xs w-5 h-5 flex items-center justify-center text-red-500">
                    {cartCount}
                </span>
            )}
        </div>
    );
}

export default CartIcon;

CartIcon.propTypes = {
    className: PropTypes.string.isRequired,
  };
