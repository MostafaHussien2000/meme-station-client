import { motion } from "framer-motion"
function PasswordSettings() {
    return (
        <motion.section
            key={1}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{
                duration: 0.3,
                ease: [0.5, 0.71, 1, 1.5],
            }}
            id="password-settings">
            <h1>Password Settings</h1>
        </motion.section>
    );
}

export default PasswordSettings;
