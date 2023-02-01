import com.mojang.logging.LogUtils;
import org.slf4j.Logger;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ProotClient {
    static final boolean debug = false;
    static final Logger LOGGER = LogUtils.getLogger();

    public static void main(String[] args) {
        ProotClient.startProcess(args);
    }

    public static void startProcess(String[] args) {
        log("START");

        String[] cmdArgs = new String[args.length + 2];
        cmdArgs[0] = "node";
        cmdArgs[1] = System.getProperty("user.dir") + "\\prootclient\\ProotClient.js";
        System.arraycopy(args, 0, cmdArgs, 2, args.length);

        debug("Command args:");
        for (String cmdArg : cmdArgs) {
            debug("    " + cmdArg);
        }

        debug("Building process");
        ProcessBuilder processBuilder = new ProcessBuilder();
        //processBuilder.command(cmdArgs);
        processBuilder.command(System.getProperty("user.dir") + "\\start.bat");
        debug("Process built");

        try {
            debug("Starting process");
            Process process = processBuilder.start();
            debug("Process started");
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            debug("Got input stream");
            String line;
            while ((line = reader.readLine()) != null) {
                log("(js) " + line);
            }
            debug("Waiting for process end");
            int exitVal = process.waitFor();
            log("STOP");
            if (exitVal == 0) {
                debug("Process has completed successfully");
                System.exit(0);
            } else {
                debug("Unexpected exit val: " + exitVal);
                System.exit(exitVal);
            }
        } catch (IOException | InterruptedException e) {
            error(e.getMessage());
        }
    }

    public static void log(String string) {
        ProotClient.LOGGER.info(string);
    }

    public static void debug(String string) {
        if (debug) {
            ProotClient.LOGGER.info(string);
        }
    }

    public static void error(String string) {
        ProotClient.LOGGER.error(string);
    }
}
