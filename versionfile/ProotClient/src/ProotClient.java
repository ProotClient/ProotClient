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

    /*public static String combineArgs(String[] args) {
        StringBuilder sb = new StringBuilder();
        for (String str : args) {
            sb.append(str).append(' ');
        }
        return sb.substring(0, Math.max(0, sb.length() - 1));
    }*/

    public static void startProcess(String[] args) {
        ProotClient.LOGGER.info("STARTING ProotClient");

        String[] cmdArgs = new String[args.length + 2];
        cmdArgs[0] = "node";
        cmdArgs[1] = System.getProperty("user.dir") + "\\prootclient\\ProotClient.js";
        System.arraycopy(args, 0, cmdArgs, 2, args.length);

        ProotClient.LOGGER.info("Command args:");
        for (int i = 0; i < cmdArgs.length; i++) {
            ProotClient.LOGGER.info("    " + cmdArgs[i]);
        }

        ProotClient.LOGGER.info("Building new process");
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command(cmdArgs);
        ProotClient.LOGGER.info("Process built");

        try {
            ProotClient.LOGGER.info("Starting process");
            Process process = processBuilder.start();
            ProotClient.LOGGER.info("Process started");
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            ProotClient.LOGGER.info("Got input stream");
            String line;
            while ((line = reader.readLine()) != null) {
                LOGGER.info(line + "\n");
            }
            ProotClient.LOGGER.debug("Waiting for process end");
            int exitVal = process.waitFor();
            if (exitVal == 0) {
                ProotClient.LOGGER.info("Process has completed successfully");
                System.exit(0);
            } else {
                ProotClient.LOGGER.warn("Unexpected exit val: " + exitVal);
                System.exit(exitVal);
            }
            ProotClient.LOGGER.info("CLOSING");
        } catch (IOException | InterruptedException e) {
            ProotClient.LOGGER.error(e.getMessage());
        }
    }
}
