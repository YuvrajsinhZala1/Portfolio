/**
 * Logger Module
 * Provides logging functionality for debugging and error tracking
 */

const logger = (function() {
    // Log levels
    const LOG_LEVELS = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3
    };
    
    // Current log level (default to INFO)
    let currentLogLevel = LOG_LEVELS.INFO;
    
    // Application name
    let appName = 'app';
    
    // Log storage
    const logs = [];
    
    // Maximum number of logs to keep in memory
    const MAX_LOGS = 1000;
    
    // Log file write interval (in milliseconds)
    const LOG_WRITE_INTERVAL = 5000;
    
    // Log file path (for real implementation)
    const LOG_FILE_PATH = '../logs/app.log';
    
    /**
     * Initialize the logger
     * @param {string} name - Application name
     * @param {number} level - Log level (optional)
     */
    function init(name, level) {
        appName = name || appName;
        
        if (level !== undefined && Object.values(LOG_LEVELS).includes(level)) {
            currentLogLevel = level;
        }
        
        // Setup periodic log saving
        setInterval(saveLogs, LOG_WRITE_INTERVAL);
        
        // Log initialization
        log('info', 'Logger initialized');
        
        return {
            appName,
            logLevel: getLogLevelName(currentLogLevel)
        };
    }
    
    /**
     * Log a message
     * @param {string} level - Log level (debug, info, warn, error)
     * @param {string} message - Log message
     * @param {Object} data - Additional data (optional)
     */
    function log(level, message, data) {
        const logLevelValue = getLogLevelValue(level);
        
        // Check if we should log this message based on current log level
        if (logLevelValue < currentLogLevel) {
            return;
        }
        
        // Create log entry
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: level.toUpperCase(),
            app: appName,
            message: message,
            data: data
        };
        
        // Add to log storage
        logs.push(logEntry);
        
        // Trim logs if needed
        if (logs.length > MAX_LOGS) {
            logs.shift();
        }
        
        // Log to console (with appropriate styling)
        logToConsole(logEntry);
        
        return logEntry;
    }
    
    /**
     * Get the string name of a log level
     * @param {number} level - Log level value
     * @returns {string} Log level name
     */
    function getLogLevelName(level) {
        return Object.keys(LOG_LEVELS).find(key => LOG_LEVELS[key] === level) || 'UNKNOWN';
    }
    
    /**
     * Get the numeric value of a log level
     * @param {string} level - Log level name
     * @returns {number} Log level value
     */
    function getLogLevelValue(level) {
        const levelUpper = level.toUpperCase();
        return LOG_LEVELS[levelUpper] !== undefined ? LOG_LEVELS[levelUpper] : LOG_LEVELS.INFO;
    }
    
    /**
     * Log to the browser console with appropriate styling
     * @param {Object} logEntry - Log entry object
     */
    function logToConsole(logEntry) {
        const styles = {
            DEBUG: 'color: #6c757d',
            INFO: 'color: #17a2b8',
            WARN: 'color: #ffc107; font-weight: bold',
            ERROR: 'color: #dc3545; font-weight: bold'
        };
        
        const style = styles[logEntry.level] || styles.INFO;
        
        // Format the log message
        const formattedMessage = `[${logEntry.timestamp}] [${logEntry.level}] [${logEntry.app}]: ${logEntry.message}`;
        
        // Log with appropriate method and styling
        switch (logEntry.level) {
            case 'DEBUG':
                console.debug('%c' + formattedMessage, style);
                break;
            case 'INFO':
                console.info('%c' + formattedMessage, style);
                break;
            case 'WARN':
                console.warn('%c' + formattedMessage, style);
                break;
            case 'ERROR':
                console.error('%c' + formattedMessage, style);
                break;
            default:
                console.log('%c' + formattedMessage, style);
        }
        
        // Log additional data if present
        if (logEntry.data) {
            console.log(logEntry.data);
        }
    }
    
    /**
     * Save logs to file (simulated in browser environment)
     */
    function saveLogs() {
        if (logs.length === 0) {
            return;
        }
        
        try {
            // In a browser environment, we can't directly write to a file system
            // This is a simulation for demonstration purposes
            
            // In a real server environment, this would write logs to a file
            // For now, we'll store in localStorage as a demonstration
            const currentLogs = JSON.parse(localStorage.getItem('app_logs') || '[]');
            const updatedLogs = [...currentLogs, ...logs];
            
            // Only keep the most recent logs
            const trimmedLogs = updatedLogs.slice(-MAX_LOGS);
            
            localStorage.setItem('app_logs', JSON.stringify(trimmedLogs));
            
            // Clear the in-memory logs after saving
            logs.length = 0;
            
            log('debug', 'Logs saved to storage');
        } catch (error) {
            console.error('Error saving logs:', error);
        }
    }
    
    /**
     * Get all stored logs
     * @returns {Array} Array of log entries
     */
    function getLogs() {
        try {
            const storedLogs = JSON.parse(localStorage.getItem('app_logs') || '[]');
            return [...storedLogs, ...logs];
        } catch (error) {
            console.error('Error retrieving logs:', error);
            return logs;
        }
    }
    
    /**
     * Set the current log level
     * @param {string|number} level - Log level
     */
    function setLogLevel(level) {
        if (typeof level === 'string') {
            const levelUpper = level.toUpperCase();
            if (LOG_LEVELS[levelUpper] !== undefined) {
                currentLogLevel = LOG_LEVELS[levelUpper];
                log('info', `Log level set to: ${levelUpper}`);
            }
        } else if (typeof level === 'number' && Object.values(LOG_LEVELS).includes(level)) {
            currentLogLevel = level;
            log('info', `Log level set to: ${getLogLevelName(level)}`);
        }
    }
    
    /**
     * Clear all logs
     */
    function clearLogs() {
        logs.length = 0;
        localStorage.removeItem('app_logs');
        log('info', 'Logs cleared');
    }
    
    // Public API
    return {
        init,
        log,
        debug: (message, data) => log('debug', message, data),
        info: (message, data) => log('info', message, data),
        warn: (message, data) => log('warn', message, data),
        error: (message, data) => log('error', message, data),
        getLogs,
        setLogLevel,
        clearLogs,
        LOG_LEVELS
    };
})();

// Make logger globally available
window.logger = logger;