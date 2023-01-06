import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) {
        startProcess(args);
    }

    static String combineArgs(String[] args) {
        StringBuilder sb = new StringBuilder();
        for (String str : args) {
            sb.append(str).append(' ');
        }
        return sb.substring(0, Math.max(0, sb.length() - 1));
    }

    static void startProcess(String[] args) {
        String[] cmdArgs = new String[args.length + 2];
        cmdArgs[0] = "node";
        cmdArgs[1] = "./ProotClient.js";
        System.arraycopy(args, 0, cmdArgs, 2, args.length);

        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command(cmdArgs);
        try {
            Process process = processBuilder.start();
            StringBuilder output = new StringBuilder();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line + "\n");
                System.out.println(line);
            }
            int exitVal = process.waitFor();
            if (exitVal == 0) {
                System.out.println("EXIT");
                System.exit(0);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
