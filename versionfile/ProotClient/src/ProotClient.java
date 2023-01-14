import com.mojang.logging.LogUtils;
import org.slf4j.Logger;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ProotClient {
    static final Logger LOGGER = LogUtils.getLogger();

    public static void main(String[] args) {
        ProotClient.startProcess(args);
    }

    public static void startProcess(String[] args) {
        ProotClient.LOGGER.info("START");

        String[] cmdArgs = new String[args.length + 2];
        cmdArgs[0] = "node";
        cmdArgs[1] = System.getProperty("user.dir") + "\\prootclient\\ProotClient.js";
        System.arraycopy(args, 0, cmdArgs, 2, args.length);

        ProotClient.LOGGER.debug("Command args:");
        for (String cmdArg : cmdArgs) {
            ProotClient.LOGGER.debug("    " + cmdArg);
        }

        ProotClient.LOGGER.debug("Building process");
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command(cmdArgs);
        ProotClient.LOGGER.debug("Process built");

        try {
            ProotClient.LOGGER.debug("Starting process");
            Process process = processBuilder.start();
            ProotClient.LOGGER.debug("Process started");
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            ProotClient.LOGGER.debug("Got input stream");
            String line;
            while ((line = reader.readLine()) != null) {
                LOGGER.info("(js) " + line);
            }
            ProotClient.LOGGER.debug("Waiting for process end");
            int exitVal = process.waitFor();
            ProotClient.LOGGER.info("STOP");
            if (exitVal == 0) {
                ProotClient.LOGGER.debug("Process has completed successfully");
                System.exit(0);
            } else {
                ProotClient.LOGGER.debug("Unexpected exit val: " + exitVal);
                System.exit(exitVal);
            }
        } catch (IOException | InterruptedException e) {
            ProotClient.LOGGER.error(e.getMessage());
        }
    }
}
